// Principio SRP: Maneja las solicitudes HTTP del chat, autenticación opcional y desacoplamiento de respuestas.
import QueryService from '../services/query.service.js';
import { QueryRepository } from '../repositories/query.repository.js';

export class QueryController {
    constructor(queryService = null) {
        this.queryService = queryService || new QueryService(new QueryRepository());
    }

    ask = async (req, res, next) => {
        try {
            const askQueryDto = {
                prompt: req.body.prompt,
                userId: req.user?.id || req.body.userId || 'anonymous',
                userRole: req.user?.role || 'visitor',
                courseId: req.body.courseId || 'general'
            };

            const result = await this.queryService.processQuery(askQueryDto);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    };

    getHistory = async (req, res, next) => {
        try {
            const userId = req.user?.id || req.query.userId || 'anonymous';
            const history = await this.queryService.getUserQueryHistory(userId);
            return res.status(200).json({ success: true, data: history });
        } catch (error) {
            next(error);
        }
    };
}

export default QueryController;